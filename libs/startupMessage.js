module.exports = (config, env) => {
  const currentENV = () => {
    const envirnoment = config[env];
    let variables = "";
    for (string in envirnoment) {
      variables += `\x1b[33m• ${string.toUpperCase()}\x1b[0m: ${
        envirnoment[string]
      } \n `;
    }
    return variables;
  };
  console.log(
    `\n[ \x1b[1m${env.toUpperCase()} ENVIRONMENT\x1b[0m ]\n ${currentENV()}`
  );

  if (env === "production")
    console.log(
      `\n\x1b[1mYour application is running on: http://localhost:5000\x1b[0m`
    );
};
