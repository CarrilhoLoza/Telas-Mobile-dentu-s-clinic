export class Paciente {
  constructor({ id, nome, email, telefone }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }

  static fromApi(data) {
    return new Paciente({
      id: data.id,
      nome: data.nome ?? '',
      email: data.email ?? '',
      telefone: data.telefone ?? '',
    });
  }
}
