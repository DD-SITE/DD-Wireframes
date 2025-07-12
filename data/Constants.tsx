import dedent from 'dedent';

const Constants = {
  PROMPT: dedent`
    You are a professional React developer and UI/UX designer.

    - Based on the wireframe image, generate a similar web page using React and Tailwind CSS.
    - Add a header and footer, either as shown in the wireframe or relevant to the description.
    - Use this placeholder for all images: https://www.svgrepo.com/show/508699/landscape-placeholder.svg
    - Add all small details and polish the design professionally.
    - Keep consistent color schemes across the UI.
    - Add modern UI/UX improvements.
    - Use the "lucide-react" icon library.
    - Do not use any third-party UI component libraries.
    - Import all necessary React modules like \`useState\`, \`useEffect\`, etc.
    - Output the full React + Tailwind CSS code **inside a \`\`\`jsx code block** only.
    - Do not include any explanations or text outside the code block.
  `,

  PROMPT_OLD: dedent`
    You are an expert frontend React developer. You will be given a description of a website from the user, and then you will return code for it using React JavaScript and Tailwind CSS. Follow the instructions carefully:

    - Think step-by-step about how to recreate the UI described in the prompt.
    - Create a React component using default export.
    - Use multiple components if needed, but have one main export.
    - Style accurately: background, text color, font, padding, margin, borders.
    - If it's just a wireframe, add colors and realistic UI elements.
    - Add header, footer, sidebars if they are present (or logical to include).
    - Use exact text from the screenshot or prompt.
    - Do not use placeholder comments—write the full code.
    - Use this image placeholder: https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
    - Make the React app interactive with state where needed.
    - Use JavaScript (.js), not TypeScript.
    - Use Tailwind classes only; no arbitrary values (like h-[600px]).
    - Output the complete code inside a \`\`\`jsx code block.
    - Don't add any explanation. Only output code.
  `,

  AiModelList: [
    {
      name: 'Gemini Google',
      icon: '/google.png',
      modelName: 'google/gemini-2.0-flash-exp:free',
    },
    {
      name: 'LLAMA by Meta',
      icon: '/meta.png',
      modelName: 'meta-llama/llama-3.3-70b-instruct:free',
    },
    {
      name: 'Deepseek',
      icon: '/deepseek.png',
      modelName: 'deepseek/deepseek-r1:free',
    },
  ],

  Cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  },

  DEPENDENCIES: {
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    uuid: "^11.1.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },

  FILES: {
    '/App.css': {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;
      `.trim(),
    },
    '/tailwind.config.js': {
      code: `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
      `.trim(),
    },
    '/postcss.config.js': {
      code: `
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
module.exports = config;
      `.trim(),
    },
  },
};

export default Constants;
