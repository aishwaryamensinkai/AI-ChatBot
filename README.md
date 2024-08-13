# ConversAI

Welcome to the ConversAI project! This repository contains the code for a conversational AI application built with Next.js. Below is an overview of the project's file structure and purpose.

## File Structure

```bash
├── README.md
├── app
│   ├── ConversAI.png
│   ├── api
│   │   ├── chatbot
│   │   │   └── route.js
│   │   ├── orchestrator
│   │   │   └── route.js
│   │   ├── smallchatbot
│   │   │   ├── knowledgeBase.js
│   │   │   └── route.js
│   │   └── test
│   │       └── route.js
│   ├── chatbot
│   │   └── page.js
│   ├── components
│   │   ├── Chatbot.js
│   │   ├── LandingPage.js
│   │   ├── LanguageSelector.js
│   │   └── SmallChatbot.js
│   ├── css
│   │   ├── Chatbot.css
│   │   ├── LandingPage.css
│   │   └── SmallChatbot.css
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── lib
│   │   └── firebaseConfig.js
│   └── page.js
├── jsconfig.json
├── middleware.js
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── public
│   ├── ConversAI.png
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
└── tsconfig.json

```


## Project Overview

### `app/`
- **ConversAI.png**: Image used in the project.
- **api/**: Contains API routes for the application.
  - **chatbot/**: API routes related to chatbot functionality.
    - `route.js`: Handles chatbot API requests.
  - **orchestrator/**: API routes for orchestrating services.
    - `route.js`: Handles orchestrator API requests.
  - **smallchatbot/**: API routes for the small chatbot.
    - **knowledgeBase.js**: Contains knowledge base data.
    - `route.js`: Handles small chatbot API requests.
  - **test/**: Test-related API routes.
    - `route.js`: Handles test API requests.
- **chatbot/**: Contains the page component for the chatbot.
  - `page.js`: Main page component for the chatbot.
- **components/**: Reusable React components.
  - **Chatbot.js**: Component for the main chatbot interface.
  - **LandingPage.js**: Component for the landing page.
  - **LanguageSelector.js**: Component for selecting languages.
  - **SmallChatbot.js**: Component for the small chatbot interface.
- **css/**: Contains CSS styles for various components.
  - **Chatbot.css**: Styles for the Chatbot component.
  - **LandingPage.css**: Styles for the LandingPage component.
  - **SmallChatbot.css**: Styles for the SmallChatbot component.
- **favicon.ico**: Favicon for the application.
- **globals.css**: Global styles for the application.
- **layout.js**: Layout component for the application.
- **lib/**: Contains utility files.
  - **firebaseConfig.js**: Firebase configuration file.
- **page.js**: Main page component for the application.

### `jsconfig.json`
Configuration file for JavaScript projects.

### `middleware.js`
Middleware configuration file.

### `next-env.d.ts`
TypeScript environment configuration file for Next.js.

### `next.config.mjs`
Next.js configuration file.

### `package-lock.json` & `package.json`
Node.js package management files.

### `public/`
Static files served by the application.
- **ConversAI.png**: Image used in the public directory.
- **favicon.ico**: Favicon for the application.
- **next.svg** & **vercel.svg**: Static SVG images.

### `tsconfig.json`
TypeScript configuration file.

## Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aishwaryamensinkai/AI-ChatBot.git
   ```

2. **Install Dependencies**

  ```bash
  npm install
  ```

3. **Run the Application**

  ```bash
  npm install
  ```

4. **Open Your Browser**

Navigate to http://localhost:3000 to view the application.


## Contributing

Contributions are welcome! If you'd like to add new features, improve existing ones, or fix any bugs, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the Apache License.

## Acknowledgments

- Inspiration and guidance from various online tutorials and resources.
- Special thanks to the open-source community for their invaluable resources and tools.

## Resources

- https://clerk.com/
- https://platform.openai.com/assistants
