import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import { 
  BrowserRouter, 
  Routes,
  Route, 
} from "react-router-dom";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="attendees">
            <Route path="new" element={ <AttendConferenceForm/> } />
          </Route>
          {/* <AttendeConferenceForm/> */}
          <Route path="conferences">
            <Route path="new" element={ <ConferenceForm/> } />
          </Route>
          {/* <ConferenceForm/> */}
          <Route path="locations">
            <Route path="new" element={ <LocationForm/> } />
          </Route>
          {/* <LocationForm/> */}
          <Route path="attendees">
            <Route path="" element={ <AttendeesList attendees={props.attendees} /> } />
          </Route>
          {/* <AttendeesList attendees={props.attendees} /> */}
          <Route path="presentations">
            <Route path="new" element={ <PresentationForm/> } />
          </Route>
          {/* <PresentationForm/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
