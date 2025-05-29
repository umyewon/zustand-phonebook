import './App.css'
import './Font.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

/* 컴포넌트 */
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'


function App() {

  return (
    <>
    <h1 className="appTitle">전화번호부</h1>  

      <Grid margin={{ xs: 2, md: 5}} padding={{ xs: 2, md: 4}} container rowSpacing={2} 
          columnSpacing={{ xs: 1, sm: 2, md: 3 }} display="flex" alignItems="flex-start" justifyContent="center">
        <Grid size={{ xs: 12, sm: 4, md: 2.6}} className="appWrap">
          <ContactForm/>
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 6}} className="appWrap">
          <ContactList/>
        </Grid>
      </Grid>

    </>
  )
}

export default App
