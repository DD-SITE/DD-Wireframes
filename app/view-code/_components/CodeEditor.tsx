import React from 'react';
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import Constants from '@/data/Constants';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import { extractCleanCode } from '@/utils/extractCleanCode';

type Props = {
  codeResp: string;
  isReady: boolean;
};

function CodeEditor({ codeResp, isReady }: Props) {
  const cleanCode = extractCleanCode(codeResp);

  return (
    <div>
      {isReady ? (
        <Sandpack
          template="react"
          theme={aquaBlue}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
            showNavigator: true,
            showTabs: true,
            editorHeight: 600,
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDENCIES,
            },
          }}
          files={{
            '/App.js': {
              code: cleanCode,
              active: true,
            },
            ...Constants.FILES,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={aquaBlue}
          files={{
            '/App.js': {
              code: cleanCode,
              active: true,
            },
            ...Constants.FILES,
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDENCIES,
            },
          }}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: '70vh' }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditor;
