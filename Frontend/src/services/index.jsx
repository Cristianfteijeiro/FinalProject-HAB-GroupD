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

export const getUserDataService = async (id, token) => {
  const response = await fetch(`${baseURL}/usuarios/${id}`, {
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

export const getUserRecsService = async (id, token) => {
  const response = await fetch(`${baseURL}/usuarios/${id}/recs`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

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

export const sendRecService = async ({ data, token }) => {
  const response = await fetch(`${baseURL}/recomendaciones`, {
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
};

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
};

export const handleRatingChange = async (newRating) => {
  try {
    const response = await fetch(`${baseURL}/recomendaciones/${recId}/votar`, {
      method: "POST",
      body: JSON.stringify({ vote: newRating }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      // Puedes manejar el error aquí
      console.error("Error al enviar el voto:", response.statusText);
      return;
    }

    setRating(newRating);
    onRate(newRating);
  } catch (error) {
    console.error("Error al enviar el voto:", error);
  }
};
