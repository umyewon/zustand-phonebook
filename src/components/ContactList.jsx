import { useState } from 'react'
import usePhoneBookStore from '../stores/usePhoneBookStore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import callmg from '../image/call.png';
import defaultProfile from '../image/userProfile1.png';

const ContactList = () => {
    const { phoneBook, serachBy, searchBook } = usePhoneBookStore();
    const [ searchKey, setSearchKey ] = useState();


    const enterPress = (e)=>{
        if(e.key == 'Enter'){
            console.log(searchKey)
            serachBy(searchKey);
        }
    }

    const goCall = (num) => {
        let phoneNum = num.replace(/[^0-9]/g, ''); // 하이픈 제거
        location.href="tel:" + phoneNum ;
    }
  return (
    <div>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
            <Box display="flex" flexDirection="row" className="inputWrap">
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <TextField id="search" fullWidth label="연락처 검색" variant="standard" color="secondary"
                    value={searchKey || ''} onChange={(e) => setSearchKey(e.target.value)} onKeyDown={(e) => enterPress(e)} autoComplete='off'/>
            </Box>
            <Box display="flex" flexDirection="column" fontFamily={"Godo"} fontWeight={"400"} gap={2} className="inputWrap">
                {(searchBook? searchBook : phoneBook).map((item) => {
                    return (
                        <Box padding={{ xs: 1, md: 3}} className="inputWrap contactListWrap" key={item.id} display="flex" flexDirection="row">
                            <img className="profileImg" src={item.profile ? item.profile : defaultProfile }/>
                            <p>{item.name} <br/>{item.phoneNum}</p>
                            <img src={callmg} className="callImg" onClick={()=>goCall(item.phoneNum)}/>
                         </Box>);  
                })}
            </Box>
        </Box>
    </div>
  )
}

export default ContactList