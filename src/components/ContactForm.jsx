import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';

/* 상태 관리 store */
import usePhoneBookStore from '../stores/usePhoneBookStore';

// 1. 사진 업로드를 받는다.
// 2. 이름과 전화번호 입력 받는다.

const ContactForm = () => {
  const [ name, setName ] = useState();
  const [ phoneNum, setPhoneNum ] = useState('');         // 현재 컴포넌트 내에서만 쓰이기 때문에 useState로 상태 관리
  const [ profile , setProfile ] = useState('');          // 원본 파일 
  const [ profileUrl , setProfileUrl ] = useState('');    // 파일url
  const { addContact } = usePhoneBookStore();             // 연락처 store (다른 컴포넌트에서도 사용)
  const [ nameBlank, setNameBlank ] = useState(false);    // 빈 값 여부
  const [ phoneBlank, setPhoneBlank ] = useState(false);  // 빈 값 여부
  
  /* 연락처 추가 */
  const handleAddContact = () => {
    if(name =='' || name == null){
      setNameBlank(true); return;
    } else {setNameBlank(false)}

    if(phoneNum =='' || phoneNum == null){
      setPhoneBlank(true); return;
    } else {setPhoneBlank(false)}
    
    // 연락처 저장 장소에
    if(!name.trim() || !phoneNum.trim()) return
    // 연락처를 추가
    addContact(profileUrl, name, phoneNum) // 서버로 파일을 넘기는게 아니라 그냥 url을 넘기는 거로 수정함
    setName(''); setPhoneNum(''); setProfileUrl('');
  }

  /* 전화번호 포맷 */
  const formatPhoneNum = (val) => {
    if(val.length > 13) return;   // 13자리 이상 입력 불가
    setPhoneNum(val);
  }
  useEffect(() => {
    setPhoneNum(phoneNum.replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
                          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                          .replace(/(\-{1,2})$/g, ""));
  }, [phoneNum])

  /* 프로필 이미지 업로드 */
  const uploadProfile = (target) => {
    // 실제 파일 set 
    let file = Array.from(target.files)[0]; // 첨부한 파일 가져오기 (배열임)
    setProfile(file);

    // 파일의 url을 담을 빈 배열 변수 생성
    let fileUrl = [];
    let fileReader = new FileReader();    // 웹에서 파일을 읽을 수 있는 객체
    fileReader.onloadend = () => {      // 파일의 내용을 읽어온 후 호출
      // 미리보기에 사용할 이미지 URL set
      setProfileUrl(fileReader.result); // result는 파일을 base64형식으로 변환
    } 
    fileReader.readAsDataURL(file);     // 파일을 base64형식으로 읽을 수 있게
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} >
        <label className="profileWrap" htmlFor="profile" style={{'cursor' : 'pointer'}} title="프로필사진 선택">
          <FontAwesomeIcon className="cameraIcon" icon={faCamera} />
          <img src={profileUrl ? profileUrl : 'image/userProfile1.png'} width={95} alt="프로필사진"/>
          <input type="file" id="profile" accept="image/*" onChange={(e)=>uploadProfile(e.target)} />
        </label>
          
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2} className="inputWrap">
            <TextField id="name" fullWidth label="이름" variant="standard" color="secondary" autoComplete='off' error={nameBlank}
                value={name || ''} onChange={(e) => {setName(e.target.value)}} helperText={nameBlank ? '이름을 입력해주세요.' : ''} />
            <TextField id="phoneNum" fullWidth label="전화번호" variant="standard" color="secondary" autoComplete='off' error={phoneBlank}
                value={phoneNum || ''} onChange={(e) => formatPhoneNum(e.target.value)} helperText={phoneBlank ? '전화번호를 입력해주세요.' : ''} />
        </Box>
        {/* <button className="" onClick={handleAddContact}>추가</button> */}
        <Button variant="outlined" color="secondary"onClick={handleAddContact} size='large'>추가</Button>
      </Box>
    </>
  )
}

export default ContactForm