const Aluno = require("../models/aluno");
const supabase = require("../db/supabaseClient");

module.exports = class AlunosController {
  static async createAluno(req, res) {
    const { nome, endereco } = req.body;
    // console.log(req.body);

    try {
      if (!req.files || !req.files.file || !req.files.pdfFile) {
        return res
          .status(400)
          .json({ message: "Imagem e PDF são obrigatórios." });
      }

      // Função para normalizar o nome do arquivo, removendo caracteres especiais
      const normalizeFileName = (fileName) => {
        return fileName
          .normalize("NFD") // Normaliza caracteres Unicode
          .replace(/[\u0300-\u036f]/g, "") // Remove acentos
          .replace(/[^a-zA-Z0-9.]/g, "_"); // Substitui caracteres especiais por "_"
      };

      // Upload da imagem
      const { originalname: imageName, buffer: imageBuffer } =
        req.files.file[0];
        const normalizedImageName = normalizeFileName(imageName);
      const { data: imageData, error: imageError } = await supabase.storage
        .from("uploads")
        .upload(`uploads/${Date.now()}-${normalizedImageName}`, imageBuffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: req.files.file[0].mimetype,
        });

      if (imageError) {
        console.error(
          "Erro ao fazer upload da imagem no Supabase:",
          imageError.message
        );
        return res.status(500).json({ error: imageError.message });
      }

      // Upload do PDF
      const { originalname: pdfName, buffer: pdfBuffer } = req.files.pdfFile[0];
      const normalizedPdfName = normalizeFileName(pdfName);
      const { data: pdfData, error: pdfError } = await supabase.storage
        .from("uploads")
        .upload(`pdf_files/${Date.now()}-${normalizedPdfName}`, pdfBuffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: req.files.pdfFile[0].mimetype,
        });

      if (pdfError) {
        console.error(
          "Erro ao fazer upload do PDF no Supabase:",
          pdfError.message
        );
        return res.status(500).json({ error: pdfError.message });
      }

      // Obter URLs públicos para os arquivos
      const imageUrl = supabase.storage
        .from("uploads")
        .getPublicUrl(imageData.path).data.publicUrl;
      const pdfUrl = supabase.storage
        .from("pdf_files")
        .getPublicUrl(pdfData.path).data.publicUrl;


      const aluno = {
        nome: nome,
        endereco: endereco,
        image_url: imageUrl,
        pdf_url: pdfUrl,
      };
      console.log(aluno.nome, imageUrl, pdfUrl);

      await Aluno.create(aluno);

      res.status(200).json({
        message: "Upload bem-sucedido!",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
