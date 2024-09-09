const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
    document.cookie = 'uid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    Swal.fire({
      title: "Success!",
      text: "Logout Successfully",
      icon: "success",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 5000,
      }).then(() => {
        window.location.href = '/app/login';
      });
  });