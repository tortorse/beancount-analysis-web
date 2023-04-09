let filePath;
document.querySelector("#file-path").addEventListener("change", (e) => {
  filePath = e.target.value;
});

document.querySelector("#save").addEventListener("click", async (e) => {
  try {
    const res = await fetch("/write-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: filePath,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      console.log(data.status);
    } else {
      console.error(data.status);
    }
  } catch (error) {
    console.error(error);
  }
});
