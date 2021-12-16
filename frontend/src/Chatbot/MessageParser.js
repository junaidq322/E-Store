class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello") || lowercase.includes("hey")) {
      this.actionProvider.greet();
    }
    if (lowercase.includes("pant") || lowercase.includes("pants")) {
      this.actionProvider.Pants();
    }
    if (lowercase.includes("shirt") || lowercase.includes("shirts")) {
      this.actionProvider.Shirts();
    }
  }
}

export default MessageParser;
