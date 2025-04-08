async function findGroup() {
    const inputId = document.getElementById('studentIdInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    try {
        const response = await fetch('matches.json');
        const data = await response.json();

        const group = data.find(group =>
            group["Student 1 ID"].toLowerCase() === inputId ||
            group["Student 2 ID"].toLowerCase() === inputId ||
            group["Student 3 ID"].toLowerCase() === inputId ||
            group["Student 4 ID"].toLowerCase() === inputId
        );

        if (!group) {
            resultDiv.innerHTML = `<p style="color:red;">No group found for ID "${inputId}".</p>`;
            return;
        }

        // Build HTML output
        let output = `<h2>Group ${group["Group ID"]}</h2><ul>`;
        for (let i = 1; i <= 4; i++) {
            const id = group[`Student ${i} ID`];
            const name = group[`Student ${i} Name`];
            if (id && id !== "N/A") {
                output += `<li><strong>${name}</strong> (${id})</li>`;
            }
        }
        output += `</ul><p><strong>Overall Compatibility:</strong> ${group["Overall Compatibility"]}</p>`;

        for (let i = 1; i <= 3; i++) {
            const label = `S${i} → S${i + 1} Compatibility`;
            if (group[label] !== "N/A") {
                output += `<p>${label}: ${group[label]}</p>`;
            }
        }

        resultDiv.innerHTML = output;
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Error loading group data.</p>`;
        console.error(err);
    }
}