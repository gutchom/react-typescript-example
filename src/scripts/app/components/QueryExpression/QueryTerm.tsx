import React, { ChangeEvent } from 'react'
import SelectableInput from 'app/components/SelectableInput'

export type QueryOperator = 'AND' | 'OR'

export type LogicalOperator =  QueryOperator | 'NOR'

export enum Operator { AND, OR, NOR }

export const translate = {
  sign: ['+', '?', '-'],
  queryJa: ['なおかつ', 'もしくは'],
  keysJa: ['を全て含む', 'のどれかを含む', 'を全て含まない'],
}

export interface QueryCondition {
  keywords: string[]
  operator: LogicalOperator
}

export interface QueryTermProps {
  focus: boolean
  position: number
  defaults: QueryCondition
  suggestions: string[]
  onChange(position: number, condition: Partial<QueryCondition>): void
  onRemove(position: number): void
}

export interface QueryTermState extends QueryCondition {
  confirming: boolean
}

export default class QueryTerm extends React.Component<QueryTermProps, QueryTermState> {
  state = {
    ...this.props.defaults,
    confirming: false,
  }

  handleKeywordChange = (keywords: string[]) => {
    this.setState({ keywords })
    this.props.onChange(this.props.position, { keywords })
  }

  handleKeywordOperatorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ operator: e.target.value as LogicalOperator })
    this.props.onChange(this.props.position, { operator: e.target.value as LogicalOperator })
  }

  handleRemove = () => {
    if (this.state.confirming) {
      this.props.onRemove(this.props.position)
    } else {
      this.setState({ confirming: true })
    }
  }

  handleCancelRemove = () => {
    this.setState({ confirming: false })
  }

  render() {
    return (
      <li className="query-expression--term">
        <div className={`query-expression--confirm ${this.state.confirming ? 'visible' : ''}`}
             onClick={this.handleCancelRemove}>
          <button className="query-expression--confirm--remove" onClick={this.handleRemove}>
            <i className="fa fa-trash-o"/>
          </button>
        </div>

        <button className="query-expression--remove" onClick={this.handleRemove}>
          <i className="fa fa-trash-o"/>
        </button>

        <SelectableInput defaults={this.state.keywords}
                         focus={this.props.focus}
                         options={this.props.suggestions}
                         onChange={this.handleKeywordChange}/>

        <select value={this.state.operator}
                onChange={this.handleKeywordOperatorChange}>
          {Array(3).fill(null).map((_, index) =>
            <option key={index} value={Operator[index]}>{translate.keysJa[index]}</option>
          )}
        </select>
      </li>
    )
  }
}
