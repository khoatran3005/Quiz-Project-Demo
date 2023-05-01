import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from 'react-i18next';

const TableUserPaginate = (props) => {

  // const [listUsers, setListUsers] = useState([])

  const { listUsers, pageCount } = props;

  const { t } = useTranslation();

  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}, which is offset`);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t('m-user.username')}</th>
            <th scope="col">Email</th>
            <th scope="col">{t('m-user.role')}</th>
            <th>{t('m-user.action')}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>@{item.role}</td>
                  <td>
                    <button className="btn btn-secondary"
                      onClick={() => props.handleClickBtnView(item)}>{t('m-user.view')}</button>
                    <button className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}>{t('m-user.update')}</button>
                    <button className="btn btn-danger"
                      onClick={() => props.handleClickBtnDelete(item)}>{t('m-user.delete')}</button>
                  </td>
                </tr>
              )
            })
          }

          {listUsers && listUsers.length === 0 &&
            <tr>
              <td colSpan={'4'}>{t('m-user.not')}</td>
            </tr>}

        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>

    </>
  )
}

export default TableUserPaginate;