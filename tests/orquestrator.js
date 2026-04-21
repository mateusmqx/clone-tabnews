import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fecthStatusPage, {
      retries: 100,
    });

    async function fecthStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw new Error("Web server is not ready yet");
      }
    }
  }
}

const orquestrator = {
  waitForAllServices,
};

export default orquestrator;
