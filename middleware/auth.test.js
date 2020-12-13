const auth = require('./auth');

test('Admin always gets through, string', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678, roles: ['admin'] } } };
  const next = () => 'success';
  expect(auth('member')(req, res, next)).toBe('success');
});

test('Handles valid self string input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234 } } };
  const next = () => 'success';
  expect(auth('self')(req, res, next)).toBe('success');
});

test('Handles invalid self string input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678 } } };
  const next = () => 'success';
  expect(() => auth('self')(req, res, next)).toThrow('Just... no.');
});

test('Admin always gets through, array', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678, roles: ['admin'] } } };
  const next = () => 'success';
  expect(auth(['member', 'self'])(req, res, next)).toBe('success');
});

test('Handles valid array input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['self', 'member'])(req, res, next)).toBe('success');
});

test('Handles invalid self array input', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678, roles: [] } } };
  const next = () => 'success';
  expect(() => auth(['self', 'member'])(req, res, next)).toThrow('Just... no.');
});
