document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-btn");

  const profile = {
      name: "User",
      picture: "profile-picture.png"
  };

  sendButton.addEventListener("click", async function() {
      const userChoice = userInput.value;
      if (userChoice === "") {
          return;
      }

      const userMessageElement = createMessageElement("user", userChoice, true);
      chatBox.appendChild(userMessageElement);

      userInput.value = "";

      const typingIndicator = createTypingIndicator();
      chatBox.appendChild(typingIndicator);

      const botMessage = await getBotResponse(userChoice);
      typingIndicator.remove();

      const botMessageElement = createMessageElement("bot", botMessage, true);
      chatBox.appendChild(botMessageElement);

      chatBox.scrollTop = chatBox.scrollHeight;
  });

  userInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
          sendButton.click();
      }
  });

  async function getBotResponse(userChoice) {
      let botMessage = "";

      switch (userChoice) {
          case "feeling-bored":
              botMessage = "I'm here to keep you company! How about trying a new hobby or reading a book?";
              break;
          case "feeling-low":
              botMessage = "I'm sorry to hear that. Consider talking to a friend or engaging in activities you enjoy.";
              break;
          case "mental-health-resources":
              botMessage = "For mental health resources, you might want to check out websites like Mental Health America or NAMI.";
              break;
          case "self-care-tips":
              botMessage = "Practicing self-care is important. You can try taking a walk, meditating, or listening to music.";
              break;
          case "stress-relief":
              botMessage = "To relieve stress, deep breathing exercises and yoga can be helpful.";
              break;
          case "productivity-tips":
              botMessage = "Boost your productivity by setting goals, staying organized, and taking breaks.";
              break;
          case "healthy-habits":
              botMessage = "Incorporate healthy habits like staying hydrated, eating balanced meals, and getting enough sleep.";
              break;
          default:
              botMessage = "I'm here to help! Feel free to ask me anything.";
              break;
      }

      return botMessage;
  }

  function createTypingIndicator() {
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "bot-message typing";
      typingIndicator.textContent = "Typing...";
      return typingIndicator;
  }

  function createMessageElement(sender, content, showTimestamp = false) {
      const messageElement = document.createElement("div");
      messageElement.className = `${sender}-message`;

      if (sender === "user") {
          messageElement.innerHTML = `<span class="profile-name">${profile.name}:</span> ${content}`;
      } else {
          messageElement.innerHTML = `<span class="profile-name">Bot:</span> ${content}`;
      }

      if (showTimestamp) {
          const timestampElement = document.createElement("div");
          timestampElement.className = "timestamp";
          timestampElement.textContent = getCurrentTimestamp();
          messageElement.appendChild(timestampElement);
      }

      return messageElement;
  }

  function getCurrentTimestamp() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
  }

  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
});
