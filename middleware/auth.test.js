const auth = require('./auth');

test('Handles valid self string input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234 } } };
  const next = () => 'success';
  expect(auth('self')(req, res, next)).toBe('success');
});

test('Handles invalid self string input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235 } } };
  const next = () => 'success';
  expect(() => auth('self')(req, res, next)).toThrow('Just... no.');
});

test('Handles valid admin string input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { roles: ['admin', 'member'] } } };
  const next = () => 'success';
  expect(auth('admin')(req, res, next)).toBe('success');
});

test('Handles invalid self string input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { roles: ['member'] } } };
  const next = () => 'success';
  expect(() => auth('admin')(req, res, next)).toThrow('Just... no.');
});

test('Handles valid array input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['self', 'member'])(req, res, next)).toBe('success');
});

test('Handles invalid self array input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: ['member'] } } };
  const next = () => 'success';
  expect(() => auth(['self', 'member'])(req, res, next)).toThrow('Just... no.');
});

test('Handles invalid role array input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: ['member'] } } };
  const next = () => 'success';
  expect(() => auth(['admin', 'member'])(req, res, next)).toThrow(
    'Just... no.'
  );
});
