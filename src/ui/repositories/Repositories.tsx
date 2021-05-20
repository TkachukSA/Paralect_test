import React from 'react';
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

export function Repositories(props: RepositoriesType) {
    const dispatch = useDispatch()


    const setPage = ({selected}: any) => {
        dispatch(setUserTC(props.user.login, 4, selected + 1))
    }


    return (<>
        <h1 className={s.reposContainer}>Repositories {`(${props.user.public_repos})`}</h1>
        {props.repos.map(r => {
            return <div className={s.reposContainer} key={r.id}>
                <div className={s.itemRepos}>
                    <div>{<a target={"_blank"} href={r.html_url}>{r.name}</a>}</div>
                    <div>{r.description}</div>
                </div>
            </div>
        })}

        <div className={s.pagination}>
            <ReactPaginate
                pageCount={Math.ceil(props.user.public_repos / 4)}
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
}
