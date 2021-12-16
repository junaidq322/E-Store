class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage(
      "Hello Customer. How may I help you?"
    );
    this.addMessageToState(message);
  };

  Pants = () => {
    document.location.href = "/search/category/Pants";
    const message = this.createChatBotMessage(
      "Hello Customer. Welcome to Accessories page"
    );
    this.addMessageToState(message);
  };
  Shirts = () => {
    document.location.href = "/search/category/Shirts";
    const message = this.createChatBotMessage(
      "Fantastic. Here is your quiz. Good luck!",
      {
        widget: "javascriptQuiz",
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}
export default ActionProvider;
