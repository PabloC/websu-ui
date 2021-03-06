import React, { useState, useEffect } from 'react'
import ReportViewer from 'react-lighthouse-viewer'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import config from './config.js'

export const ReportDetail = () => {
  const [report, setReport] = useState({})
  let { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(config.apiHost + '/reports/' + id)
      setReport(result.data)
      console.log(result.data.audit_results)
    }
    fetchData()
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Container className="mt-4">
      <h3>Website performance of <a rel="noopener noreferrer nofollow" target="_blank" href={report.url}>{report.url}</a></h3>
      <p className="lead">
        Created on {formatDate(report.created_at)}.
      </p>
      {report.raw_json && <ReportViewer json={JSON.parse(report.raw_json)} />}
    </Container>
  )
}
