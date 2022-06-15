import { ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import "./PaymentPage.scss";

export default function PaymentPage() {
  return (
    <div className="cart__wrapper">
      <Layout>
        <Content className="site-layout">
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
          <div className="cart__content-wrapper">
            <div className="cart__content">
              <div className="cart__content-icon">
                <ShoppingCartOutlined />
              </div>
              <div className="cart__content-description">
                Your sneaker cart is empty
              </div>
              <Button>
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
