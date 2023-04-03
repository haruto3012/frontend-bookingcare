import "./ManageClinic.scss"
import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import _ from "lodash";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangleInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }

    }

    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: '',
            })
            toast.success('Add new clinic success')
        } else {
            toast.error('Somethings wrong, Please try again')
            console.log(res)
        }
    }


    render() {

        return (

            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý phòng khám</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => { this.handleOnChangleInput(event, 'name') }} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh phòng khám</label><br></br>
                        <input className="form-control-file" type="file"
                            onChange={(event) => this.handleChangeImage(event)} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Địa chỉ phòng khám</label><br></br>
                        <input className="form-control" type="text" value={this.state.address}
                            onChange={(event) => { this.handleOnChangleInput(event, 'address') }} />
                    </div>
                    <div className="col-12 my-3">
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary px-2"
                            onClick={() => this.handleSaveNewClinic()}>Save</button>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
