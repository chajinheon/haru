import { AuthProvider } from '../context/AuthContext';
import { TodoProvider } from '../context/TodoContext';
import { JournalProvider } from '../context/JournalContext';
import { NoteProvider } from '../context/NoteContext';
import { AIFeedbackProvider } from '../context/AIFeedbackContext'; // Import AIFeedbackProvider
import '../styles/globals.css';

// FullCalendar CSS Imports
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TodoProvider>
        <JournalProvider>
          <NoteProvider>
            <AIFeedbackProvider> {/* AIFeedbackProvider is now inside other providers */}
              <Component {...pageProps} />
            </AIFeedbackProvider>
          </NoteProvider>
        </JournalProvider>
      </TodoProvider>
    </AuthProvider>
  );
}

export default MyApp;
