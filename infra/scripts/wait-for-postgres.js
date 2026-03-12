const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleResult);

  function handleResult(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢 Postgres is ready!");
  }
}

process.stdout.write("\n\n\n🔴 Waiting for Postgres to be ready...");
checkPostgres();
