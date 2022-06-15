import { Breadcrumb, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import "./PaymentPage.scss";

export default function PaymentPage() {
  return (
    <div className="cart__wrapper">
      <Layout>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/">HOME</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>CART</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 380,
            }}
          >
            <div className="cart__content-wrapper"></div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
