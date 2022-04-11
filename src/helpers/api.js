const login = async (_email, _password) => {
    try {
        let user = {
            email: _email,
            password: _password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            console.log("body", JSON.stringify(user));
            let res = await fetch(process.env.REACT_APP_API_URL + '/auth/login', requestOptions)
            let userData = await res.json();
            console.log(userData);
            return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

const register = async (_firstName, _lastName, _email, _password) => {
    try {
        let user = {
            lastName: _lastName,
            firstName: _firstName,
            email: _email,
            password: _password
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            };
            console.log("body", JSON.stringify(user));
            let res = await fetch(process.env.REACT_APP_API_URL + '/auth/register', requestOptions)
            let userData = await res.json();
            console.log(userData);
            return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

const getAPR = async () => {
    try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let res = await fetch(process.env.REACT_APP_API_URL + '/staking/getAPR', requestOptions)
            let userData = await res.json();
            console.log(userData);
            return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

const setAPR = async (_stakingType, _apr, _token) => {
    try {
        let apr = {
            stakingType: _stakingType,
            apr: _apr,
            token: _token,
            };        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(apr)
        };
        let res = await fetch(process.env.REACT_APP_API_URL + '/staking/setAPR', requestOptions)
        let userData = await res.json();
        console.log(userData);
        return userData;
    } catch (error) {
        console.error('Unable to fetch data:', error)
        return false;
    }
}

export const API ={
    login, register, getAPR, setAPR
}