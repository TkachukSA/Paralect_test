import React, {useCallback} from 'react';
import s from '../profile/Profile.module.css'
import {useDispatch} from "react-redux";
import {ReposResponseType, UserResponseType} from "../../dal/api/api";
import {setUserTC} from "../../bll/redux/reducers/profile-reducer";
import ReactPaginate from 'react-paginate';
import "bootstrap/scss/bootstrap.scss";


type RepositoriesType = {
    user: UserResponseType
    repos: ReposResponseType[]
}


export const Repositories = React.memo(({repos, user}: RepositoriesType) => {
    const dispatch = useDispatch()


    const setPage = useCallback(({selected}: any) => {
        dispatch(setUserTC(user.login, 4, selected + 1))
    }, [])


    return (<>
        <h1 className={s.reposContainer}>Repositories {`(${user.public_repos})`}</h1>
        {repos.map(r => {
            return <div className={s.reposContainer} key={r.id}>
                <div className={s.itemRepos}>
                    <div>{<a rel="noreferrer" target={"_blank"} href={r.html_url}>{r.name}</a>}</div>
                    <div>{r.description}</div>
                </div>
            </div>
        })}

        <div className={s.pagination}>
            <ReactPaginate
                pageCount={Math.ceil(user.public_repos / 4)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={setPage}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                previousLinkClassName="page-link"
                pageClassName={"page-item"}
                breakClassName={"page-item"}
                nextClassName={"page-item"}
                previousClassName={"page-item"}
                previousLabel={<>&laquo;</>}
                nextLabel={<>&raquo;</>}
            />
        </div>
    </>)
})
