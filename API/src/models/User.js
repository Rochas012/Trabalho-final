import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome é obrigatório"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "E-mail é obrigatório"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ["admin", "funcionario"],
    default: "funcionario"
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Criptografa a senha antes de salvar (versão corrigida)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Método para comparar senha
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);