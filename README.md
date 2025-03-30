# SerenityChat

![SerenityChat](https://img.shields.io/badge/SerenityChat-v1.0-blue)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

SerenityChat is a mental health focused chat application designed to provide emotional support, wellness guidance, and mindfulness resources in a calming, user-friendly environment.

## Mental Health Focus

SerenityChat is specifically designed to support mental health and emotional wellbeing:

- **Mental Health Only**: The AI assistant is programmed to respond exclusively to questions related to mental health, emotional wellbeing, coping strategies, and self-care.
- **No General-Purpose Questions**: The application will politely redirect non-mental health related queries (like coding, general knowledge, etc.) back to mental health topics.
- **Content Filtering**: A warning system detects and alerts users when they ask questions outside the mental health focus area.
- **Supportive Language**: The AI maintains a calm, empathetic tone designed to provide emotional support.
- **Safety First**: For crisis situations, the app provides quick access to professional resources through the Crisis Resources card.

This specialized focus ensures that SerenityChat remains an effective tool for mental health support rather than a general-purpose assistant.

## Features

- **AI-Powered Mental Health Support**: Chat with an AI companion focused exclusively on mental health, emotional wellbeing, and coping strategies.
- **Mindfulness Exercises**: Access breathing exercises and other mindfulness practices to reduce stress and anxiety.
- **Mood Tracker**: Log your emotional state and track your mood patterns over time.
- **Crisis Resources**: Quick access to crisis support resources and helplines.
- **Daily Reflection**: Practice gratitude and self-reflection with guided daily check-ins.

## Screenshot

![SerenityChat App Screenshot](https://via.placeholder.com/800x450.png?text=SerenityChat+Screenshot)

## Getting Started

Follow these instructions to get SerenityChat up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later)
- [npm](https://www.npmjs.com/) (v7.x or later) or [yarn](https://yarnpkg.com/) (v1.22.x or later)
- A Google Gemini API key (free to obtain)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/serenity-chat.git
cd serenity-chat
```

2. **Install dependencies**

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with your Gemini API key:

```plaintext
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

To get a Gemini API key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Generate an API key
4. Copy the key to your `.env` file

### Running the Application

1. **Start the development server**

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

2. **Access the application**

Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
serenity-chat/
├── public/            # Static assets
├── src/
│   ├── components/    # React components
│   │   ├── chat/      # Chat related components
│   │   ├── theme/     # Theme components
│   │   └── ui/        # Reusable UI components
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   ├── App.tsx        # Main app component
│   ├── index.css      # Global styles
│   └── main.tsx       # Entry point
├── .env               # Environment variables (create this)
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Usage

- **Chat Interface**: Ask questions related to mental health, emotional wellbeing, or coping strategies
- **Mindfulness Exercises**: Click on the green "Mindfulness Exercises" card to access breathing exercises
- **Mood Tracker**: Use the amber "Mood Tracker" card to log your mood and see your emotional trends
- **Crisis Resources**: Access emergency contacts and support resources through the purple "Crisis Resources" card
- **Daily Reflection**: Practice gratitude with the blue "Daily Reflection & Check-In" card

## Technical Implementation Details

### Mental Health Filter Implementation

The app implements several mechanisms to maintain its mental health focus:

1. **System Prompt Engineering**: The AI system uses a carefully crafted prompt that instructs it to only respond to mental health topics.

2. **Keyword Detection**:
   - Mental health keywords are used to identify on-topic queries
   - Non-mental health keywords trigger warnings for potentially off-topic questions

3. **User Interface Design**:
   - Clear messaging about the app's purpose
   - Sample questions that guide users towards appropriate topics
   - Warning dialogs for off-topic questions

4. **Redirection Strategy**:
   - When off-topic questions are detected, the system suggests related mental health topics
   - Example: "Instead of coding help, would you like to discuss managing screen time for better mental health?"

## Development

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm run test
# or
yarn test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React + TypeScript + Vite template
- Tailwind CSS for styling
- Google's Gemini API for the AI capabilities
- All the open-source packages used in this project

---

Built with ❤️ for mental health support. Remember, while SerenityChat can provide guidance and support, it is not a replacement for professional mental health services. If you're experiencing a serious mental health crisis, please contact a mental health professional or emergency services. 