import styled from 'styled-components'

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.dark};
  font-size: 28px;
  margin-bottom: 20px;
`

export const TableBox = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 14px;
  overflow-x: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 720px;
  }

  th {
    background: ${({ theme }) => theme.dark};
    color: ${({ theme }) => theme.white};
    text-align: left;
    padding: 14px 16px;
    font-size: 14px;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    vertical-align: middle;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    object-fit: cover;
  }

  .empty {
    padding: 30px;
    text-align: center;
    color: ${({ theme }) => theme.gray};
  }
`

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 520px;
  padding: 28px;
  border-radius: 16px;
  background: ${({ theme }) => theme.dark};

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: ${({ theme }) => theme.white};
    font-weight: 500;
  }

  input[type='text'],
  input[type='number'] {
    height: 46px;
    border-radius: 8px;
    border: none;
    padding: 0 14px;
    font-size: 16px;
  }

  .upload {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 56px;
    border: 2px dashed ${({ theme }) => theme.purple};
    border-radius: 8px;
    cursor: pointer;
    color: ${({ theme }) => theme.white};

    input {
      display: none;
    }
  }

  .check {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .error {
    color: #ff8a8a;
    font-size: 13px;
  }
`
