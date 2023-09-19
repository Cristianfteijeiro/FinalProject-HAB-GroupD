const baseURL = import.meta.env.VITE_API_URL;

export const getAllRecsService = async () => {
  const response = await fetch(`${baseURL}/recomendaciones`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}; 

export const getSingleRecService = async (id) => {
  const response = await fetch(`${baseURL}/recomendaciones/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}; 


export const registerUserService = async ({ name, mail, pwd }) => {
  const response = await fetch(`${baseURL}/registro`, {
    method: "POST",
    body: JSON.stringify({ name, mail, pwd }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const getMyDataService = async (token) => {
  const response = await fetch(`${baseURL}/usuarios`, {
    headers: {
      // Authorization: `Bearer ${token}`,
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// export const getUserDataService = async (id) => {
//   const response = await fetch(`${baseURL}/usuarios/${id}`);

//   const json = await response.json();
//   console.log(json);

//   if (!response.ok) {
//     throw new Error(json.message);
//   }

//   return json.data;
// };

export const getUserRecsService = async (id) => {

  const response = await fetch(
    `${baseURL}/usuarios/${id}/recs`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}; 


export const logInUserService = async ({ mail, pwd }) => {
  const response = await fetch(`${baseURL}/usuarios/login`, {
    method: "POST",
    body: JSON.stringify({ mail, pwd }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

/* export const sendTweetService = async ({ data, token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
}; */

export const deleteRecService = async ({ id, token }) => {
  const response = await fetch(`${baseURL}/recomendaciones/${id}`, {

    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
}; */
