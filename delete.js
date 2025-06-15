document.addEventListener('DOMContentLoaded', () => {
    // جلب البيانات عند تحميل الصفحة
    fetch('http://localhost:3000/supplements')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('supplementsTableBody');
            data.forEach(supplement => {
                const imageURL = `http://localhost:3000/${supplement.image}`;
                const newRow = `
                    <tr data-id="${supplement.id}">
                        <td>
                            <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox${supplement.id}" name="options[]" value="${supplement.id}">
                                <label for="checkbox${supplement.id}"></label>
                            </span>
                        </td>
                        <td>${supplement.name}</td>
                        <td>${supplement.description}</td>
                        <td>${supplement.category}</td>
                        <td><img src="${imageURL}" alt="${supplement.name}" width="50"></td>
                        <td>
                            <a href="#editSupplementModal" class="edit" data-toggle="modal" onclick="setEditData(${supplement.id})">
                                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                            </a>
                            <a href="#deleteSupplementModal" class="delete" data-toggle="modal" onclick="setDeleteId(${supplement.id})">
                                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                            </a>
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', newRow);
            });
        })
        .catch(error => console.error('Error fetching supplements:', error));
});

function setDeleteId(id) {
    document.getElementById('deleteSupplementId').value = id;
}

function handleDelete(event) {
    event.preventDefault();

    const id = document.getElementById('deleteSupplementId').value;

    fetch(`http://localhost:3000/supplements/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // إزالة الصف من الجدول
            document.querySelector(`tr[data-id='${id}']`).remove();

            // إغلاق نافذة الحذف بعد الإزالة
            $('#deleteSupplementModal').modal('hide');
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .catch(error => {
        console.error('Error deleting supplement:', error);
    });
}
