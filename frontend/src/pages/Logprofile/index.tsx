import React from 'react';
import styled from 'styled-components';
import AAtag from "../../components/Atag"



const Logprofile =  () => {
    return(
        <div>
            this page is LogProfile page
            <br/>
            <AAtag href="/" name = "SignIn"></AAtag>
            <br/>
            <AAtag href="/signup" name = "SignUp"></AAtag>
            <br/>
            <AAtag href="/changecrawl" name = "ChangeCrawl"></AAtag>
            <br/>
            <AAtag href="/makecrawl" name = "MakeCrawl"></AAtag>
            <br/>
            <AAtag href="/log" name = "Log"></AAtag>
            <br/>
            <AAtag href="/settingprofile" name = "SettingProfile"></AAtag>
            <br/>
            <AAtag href="/specificcrawling" name = "Specificcrawling"></AAtag>
            <br/>
            <AAtag href="/userprofile" name = "UserProfile"></AAtag>
        </div>
    );
};


export default Logprofile;