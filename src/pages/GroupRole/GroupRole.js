import { useState, useEffect } from "react";
import { getAllGroup } from '../../services/userService';
import { getRolesWithGroup, getAllRoles } from '../../services/roleService';
const GroupRole = () => {
    const [listGroups, setListGroups] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [listRolesChecked, setListRolesChecked] = useState([]);
    //const [listRolesWithGroups, setListRolesWithGroups] = useState([]);

    useEffect(() => {
        getGroup();
        getRole();
    }, []);

    const getGroup = async () => {
        const result = await getAllGroup();
        if (result.data.EC === 0) {
            setListGroups(result.data.DT);
        }
    }

    const getRole = async () => {
        const result = await getAllRoles();
        if (result.data.EC === 0) {
            setListRoles(result.data.DT);
        }
    }

    const onChangeGroup = async (e) => {
        const value = e.target.value;
        if (value) {
            const result = await getRolesWithGroup(value);
            if (result.data.EC === 0) {
                const data = [];
                result.data.DT.map(item => {
                    if (item.Roles && item.Roles.url) {
                        data.push({
                            id: item.Roles.id,
                            url: item.Roles.url,
                            description: item.Roles.description,
                        });
                    }
                    return null;
                })
                const check =[];
                listRoles.map(item=>{
                    if(data.some(role=>role.id === item.id)){
                        check.push({...item,checked: true});
                    }
                    else{
                        check.push({...item,checked: false});
                    }
                    return null;
                })

                setListRolesChecked(check);

            }
        }
    }

    return (
        <div className="container">
            <div className="input-group mt-5">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Groups</label>
                <select className="form-select" id="inputGroupSelect01" onChange={(e) => onChangeGroup(e)}>
                    <option value=''>Choose...</option>
                    {listGroups.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>{item.name}</option>
                        );
                    })}
                </select>
            </div>

            <div>
                {listRolesChecked.map((role, index) => {
                    return (
                        <div className="form-check mt-4" key={index}>
                            <input className="form-check-input" type="checkbox" value={role.id} checked={role.checked} />
                            <label className="form-check-label" >
                                {role.url}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default GroupRole;