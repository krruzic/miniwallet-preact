import { h } from "preact";
import { Transaction } from "../types";
import { numberWithCommas, prettyPrintAmount } from "../utils/prettyPrintAmount";
import { useState } from "preact/hooks";

export function TransactionDetail(props: { tx: Transaction }): h.JSX.Element {

  const [showDetails, setShowDetails] = useState(false);
  return (
    <table className="tx-table table card-table text-nowrap table-vcenter">
      <thead
        onClick={((): void => !showDetails ? setShowDetails(true) : setShowDetails(false))}>
        <tr>
          <th className="monospace" style={{ fontWeight: "normal" }}
          >{props.tx.hash.slice(
            0,
            6
          )}…{props.tx.hash.slice(
            props.tx.hash.length - 6,
            props.tx.hash.length
          )}
          </th>
          <th style={{
            textAlign: "right",
            fontWeight: "normal",
          }}>
            <div
              className={(props.tx.amount < 0) ? "tx-out" : "tx-in"}>
              {prettyPrintAmount(props.tx.amount)}
            </div>
            <div className="tx-date">
              {props.tx.timestamp
                ? new Date(
                  props.tx.timestamp * 1000
                ).toLocaleDateString()
                : "Pending"}
            </div>
          </th>
        </tr>
      </thead>
      {
        showDetails &&
        <tbody className="tx-body">
          <tr>
            <td>Block Height</td>
            <td
              style={{ textAlign: "right" }}>{numberWithCommas(props.tx.blockHeight)}</td>
          </tr>
          <tr>
            <td>Fee</td>
            <td style={{ textAlign: "right" }}
              className="tx-fee">{prettyPrintAmount(props.tx.fee)}</td>
          </tr>
          {props.tx.unlockTime !== 0 && (
            <tr>
              <td>Unlock Time</td>
              <td
                style={{ textAlign: "right" }}>{props.tx.unlockTime}</td>
            </tr>
          )}
          {props.tx.paymentID !== "" && (
            <tr>
              <td>Payment ID</td>
              <td
                style={{ textAlign: "right" }}>{props.tx.paymentID}</td>
            </tr>
          )}
        </tbody>
      }
    </table>
  )
}
