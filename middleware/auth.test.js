const auth = require('./auth');

test('Admin always gets through, string', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678, roles: ['admin'] } } };
  const next = () => 'success';
  expect(auth('member')(req, res, next)).toBe('success');
});

test('Handles valid user string input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234 } } };
  const next = () => 'success';
  expect(auth('user')(req, res, next)).toBe('success');
});

test('Handles invalid user string input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: {} };
  const next = () => 'success';
  expect(() => auth('user')(req, res, next)).toThrow('Just... no.');
});

test('Handles valid self string input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234 } } };
  const next = () => 'success';
  expect(auth('self')(req, res, next)).toBe('success');
});

test('Handles invalid self string input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235 } } };
  const next = () => 'success';
  expect(() => auth('self')(req, res, next)).toThrow('Just... no.');
});

test('Admin always gets through, array', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678, roles: ['admin'] } } };
  const next = () => 'success';
  expect(auth(['member', 'self'])(req, res, next)).toBe('success');
});

test('Handles valid admin string input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { roles: ['admin', 'member'] } } };
  const next = () => 'success';
  expect(auth('admin')(req, res, next)).toBe('success');
});

test('Handles invalid admin string input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { roles: ['member'] } } };
  const next = () => 'success';
  expect(() => auth('admin')(req, res, next)).toThrow('Just... no.');
});

test('Handles valid array input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['self', 'member'])(req, res, next)).toBe('success');
});

test('Handles invalid user array input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: {} };
  const next = () => 'success';
  expect(() => auth(['user', 'member'])(req, res, next)).toThrow('Just... no.');
});

test('Handles invalid self array input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: ['member'] } } };
  const next = () => 'success';
  expect(() => auth(['self', 'member'])(req, res, next)).toThrow('Just... no.');
});

test('Handles invalid role array input, no conjunction opt given', () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: ['member'] } } };
  const next = () => 'success';
  expect(() => auth(['admin', 'member'])(req, res, next)).toThrow(
    'Just... no.'
  );
});

test("Admin always gets through, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 5678, roles: ['admin'] } } };
  const next = () => 'success';
  expect(auth(['member', 'self'], 'or')(req, res, next)).toBe('success');
});

test("Handles valid user string input, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234 } } };
  const next = () => 'success';
  expect(() => auth('user', 'or')(req, res, next)).toThrow(
    "Invalid argument type given to auth middleware. 'or' option only takes an array."
  );
});

test("Handles valid self string input, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234 } } };
  const next = () => 'success';
  expect(() => auth('self', 'or')(req, res, next)).toThrow(
    "Invalid argument type given to auth middleware. 'or' option only takes an array."
  );
});

test("Handles valid array input, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['self', 'member'], 'or')(req, res, next)).toBe('success');
});

test("Handles invalid self and role but valid user array input, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: [] } } };
  const next = () => 'success';
  expect(auth(['user', 'self', 'member'], 'or')(req, res, next)).toBe(
    'success'
  );
});

test("Handles invalid self but valid role array input, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['self', 'member'], 'or')(req, res, next)).toBe('success');
});

test("Handles invalid role but valid self array input, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['self', 'admin'], 'or')(req, res, next)).toBe('success');
});

test("Handles one valid role, one invalid role, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1234, roles: ['member'] } } };
  const next = () => 'success';
  expect(auth(['member', 'admin'], 'or')(req, res, next)).toBe('success');
});

test("Handles all invalid, 'or' conjunction opt given", () => {
  const req = { params: { id: 1234 } };
  const res = { locals: { currentUser: { id: 1235, roles: [] } } };
  const next = () => 'success';
  expect(() => auth(['self', 'admin'], 'or')(req, res, next)).toThrow(
    'Just... no.'
  );
});
