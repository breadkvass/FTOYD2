const BASE_URL = 'https://app.ftoyd.com/fronttemp-service';

const checkResponse = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err: Error) => {
      return Promise.reject(err);
    });
};

export const getMatches = async () => {
    return await fetch(`${BASE_URL}/fronttemp`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET", 
    })
    .then(checkResponse)
  };