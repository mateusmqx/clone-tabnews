import retry from "async-retry";
import database from "infra/database";

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

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

const orquestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orquestrator;
