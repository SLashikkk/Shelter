export async function initPetsData() {
try {
  const response = await fetch("./data/pets.json");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const petsData = data.map((item, index) => ({ id: index, ...item }));

} catch (error) {
  console.error("Error fetching the pets data:", error);
}
}




