import React, { Component } from 'react'
import { connect } from "react-redux";
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'
import { setSearchFeild, requestRobots } from "../actions";


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchFeild(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    // 有了redux就不需要了
    // constructor() {
    //     super()
    //     this.state = {
    //         robots: [],
    //         // 有了redux就不需要状态了
    //         // searchfield: ''
    //     }
    // }

    componentDidMount() {
        this.props.onRequestRobots()
    }

    // 有了redux就不需要了
    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
    // }

    render() {
        // 有了redux就不需要了
        // const { robots } = this.state

        const { robots, searchField, onSearchChange, isPending } = this.props
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })

        return isPending ?
            <h1>Loading</h1> :
            <div className='tc'>
                <h1 className="f1">RobotFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)