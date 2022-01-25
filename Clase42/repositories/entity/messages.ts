export default class Message {
    private author: string;
  
    private fecha: number;
  
    private text: string;
  
    constructor(author: string, fecha: number, text: string) {
      this.author = author;
      this.fecha = fecha;
      this.text = text;
    }
}