import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from '../navbar';
import UserWidget from '../widgets/UserWidget';
import AdvertWidget from '../widgets/AdvertWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import FriendListWidget from '../widgets/FriendListWidget';
import PostsWidget from '../widgets/PostsWidget';
import {setLogin,setLogout} from '../../state';
const Home =()=>{
	const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {_id, picturePath } = useSelector((state) => state.user);
	return(
		<Box>
			<NavBar></NavBar>
			<Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
	  <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
	  </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
		  <AdvertWidget />
            <Box m="2rem 0" />
			 <FriendListWidget userId={_id} />
          </Box>
)}
      </Box>
		</Box>
	)
}

export default Home;