<template>
  <div class="bgc">
    <div class="container right-panel-active">
      <div class="container__form container--signin">
        <form action="#" class="form" id="form2">
          <h2 class="form__title">Sign In</h2>
          <input type="text" placeholder="Admin" class="input" />
          <input type="password" placeholder="Password" class="input" />
          <span class="hint">登录账号: 123 登录密码: 123</span>
          <router-link to="/AdminManagement">
            <button class="btn">登录</button>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
:root {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 358px;
  --max-height: 420px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.bgc {
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: var(--white);
  background: url("./images/background_oeuhe7.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  place-items: center;
}
.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  top: 50%;
  left: 50%;
  width: 350px;
  transform: translate(-50%, -50%);
}

.container__form {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.hint {
  font-weight: 300;
  margin: 30px 0 0 0;
  margin-bottom: 1.25rem;
}

.btn {
  background-color: var(--blue);
  background-image: linear-gradient(
    90deg,
    var(--blue) 0%,
    var(--lightblue) 74%
  );
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form > .btn {
  margin-top: 1.5rem;
}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
  outline-color: rgb(124, 183, 234);
}
</style>
