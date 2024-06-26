import './UserInfoPage.css';
import '../../index.css';
import AboutProfile from '../../components/AboutProfile/AboutProfile';
import LilAd from '../../components/LilAd/LilAd';
import { Link, useParams } from 'react-router-dom';
import { setActiveAds, resetActiveAds, setSoldAds, resetSoldAds } from '../../store/reducers/adsReducer';

import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../api/api';

function AnotherUserInfoPage(props) {
    const [status, setStatus] = useState('status-active');
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const activeAds = useSelector(store => store.ads.activeAds);
    const soldAds = useSelector(store => store.ads.soldAds);

    const handleStatus = () => {
        status === 'status-active' ? setStatus('status-outpubl') : setStatus('status-active');
    }
    const handleActive = () =>{
        setStatus('status-active');
    }
    const handleNoActive = () =>{
        setStatus('status-outpubl')
    }

    useEffect(() => {
        async function getMyAds() {
            await axiosInstance.get(`ads/?user_id=${userId}`)
            .then(response => {  
                const filteredActiveAds = response.data.filter(element => element.status.name === 'Active');
                const filteredSoldAds = response.data.filter(element => element.status.name === 'Sold');
                setUser({
                    first_name: response.data[0].user_id.first_name,
                    last_name: response.data[0].user_id.last_name,
                    city: response.data[0].user_id.city,
                    phone_number:response.data[0].user_id.phone_number,
                    email:response.data[0].user_id.email,
                });
                dispatch(setActiveAds(filteredActiveAds));
                dispatch(setSoldAds(filteredSoldAds));            
            })
            .catch(error => console.error(error));
        }
        getMyAds();


    }, [dispatch]);
    
  return (
    <div className = "userInfoPage">
        <div className = "userInfoPage-title">
            Профиль и объявления
        </div>
        <div className = "userInfoPage-field">
            <div className = "infopage-field-left">
                <AboutProfile first_name={user.first_name} last_name={user.last_name} city={user.city} phone_number = {user.phone_number} email={user.email}/>
            </div>
            <div className = "field-right">
                <div className = "field-right-title">
                    <div onClick = {handleActive}>
                        {!!(status == 'status-outpubl') ? (<span>Активные</span>) : 
                        (<span><strong>Активные</strong></span>)}
                    </div>
                    <div onClick = {handleNoActive}>
                        {!!(status == 'status-active') ? (<span>Снятые с публикации</span>) : 
                        (<span><strong>Снятые с публикации</strong></span>)}
                    </div>
                </div>
                <div className = "field-right-ads">
                    {!!(status == 'status-active') && <div className = "field-right-ads-active">
                        {!!activeAds && activeAds.map(ad => (
                            <LilAd flag = "AnotherUser" key={ad.id} {...ad}/>
                        ))}
                    </div>}
                    {!!(status == 'status-outpubl') && <div className = "field-right-ads-out-publ">
                        {!!soldAds && soldAds.map(ad => (
                            <LilAd flag = "AnotherUser" key={ad.id} {...ad}/>
                        ))}
                    </div>}                   
                </div>
            </div>
        </div>
    </div>
  );
}

export default AnotherUserInfoPage;