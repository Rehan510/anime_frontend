class SocketService {
  socket: any;

  constructor() {
    this.socket = null;
  }
  init(socket: any) {
      console.log(socket,"iside service")
    this.socket = socket;
  }
  getSalary(): number {
    return 10000;
  }
}
export default new SocketService();
