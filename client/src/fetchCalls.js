async function Call(baseUri, useCase, dtoIn, method) {
  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:8888";

const FetchCall = {
  note: {
    create: async (dtoIn) => {
        return await Call(baseUri, "note/create", dtoIn, "post");
    },
    get: async (dtoIn) => {
      return await Call(baseUri, "note/get", dtoIn, "get");
    },
    list: async (dtoIn) => {
      return await Call(baseUri, "note/list", dtoIn, "get");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "note/update", dtoIn, "post");
    },
    archive: async (dtoIn) => {
      return await Call(baseUri, "note/archive", dtoIn, "post");
    },
    restore: async (dtoIn) => {
      return await Call(baseUri, "note/restore", dtoIn, "post");
    },
    listArchived: async (dtoIn) => {
      return await Call(baseUri, "note/listArchived", dtoIn, "get");
    },
  },

  folder: {
    create: async (dtoIn) => {
    return await Call(baseUri, "folder/create", dtoIn, "post");
    },
    get: async (dtoIn) => {
      return await Call(baseUri, "folder/get", dtoIn, "get");
    },
    list: async () => {
      return await Call(baseUri, "folder/list", null, "get");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "folder/update", dtoIn, "post");
    },
  },
};

export default FetchCall;