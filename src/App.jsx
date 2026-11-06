import React, { useState } from 'react';
import { Container, Button, Card, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Madang', priority: 'High', status: 'In Progress' }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // State Form Input
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('In Progress');

  const handleShowForm = () => {
    setTaskToEdit(null);
    setTitle('');
    setPriority('High');
    setStatus('In Progress');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    setTitle(task.title);
    setPriority(task.priority);
    setStatus(task.status);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (taskToEdit) {
      setTasks(tasks.map((t) => (t.id === taskToEdit.id ? { ...t, title, priority, status } : t)));
    } else {
      setTasks([...tasks, { id: Date.now(), title, priority, status }]);
    }
    handleCloseForm();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <Container>
      {/* Header Banner */}
      <div className="row m-0">
        <div className="col-12 col-lg-12">
          <div className="bg-info rounded-5 shadow mb-4 d-flex mt-3 p-2 align-items-center m-0">
            <div className="d-flex align-items-center">
              <h5 className="text-dark ms-2 fw-bold m-0">Selamat Datang Fidela</h5>
            </div>
            <button type="button" className="btn rounded-5 border border-2 btn-primary shadow-sm ms-auto bg-primary text-light">
              Dark mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="container">
        <Button variant="dark" className="shadow border border-1 border-danger" onClick={handleShowForm}>
          + Add Task
        </Button>

        <div className="mt-4">
          {/* Menampilkan Daftar Task */}
          {tasks.map((item) => (
            <Card key={item.id} className="mb-3 shadow-sm border rounded">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <div><strong>Task:</strong> {item.title}</div>
                  <div><strong>Priority:</strong> {item.priority}</div>
                  <div><strong>Status:</strong> {item.status}</div>
                </div>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => showEditForm(item)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteTask(item.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal Form Add/Edit Task */}
      <Modal show={showForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama tugas..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm}>Batal</Button>
            <Button variant="primary" type="submit">Simpan</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default App;
