import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Dashboard />
    </FluentProvider>
  );
};

export default App;
