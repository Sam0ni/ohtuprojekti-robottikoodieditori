package logo; import classes.EV3MovePilot; import java.util.concurrent.Callable;     import classes.*;public class Logo {         EV3MovePilot robot;     public Logo() {         this.robot = new EV3MovePilot();     }public void func1(DoubleVariable n, CallableVariable f)            throws ReturnException {                try {                    for(int i=0;i<n.value;i++) {                         f.value.call();                    }                 } catch (ReturnException e) {                    throw e;                } catch (Exception e) {                    System.out.println("An unidentified error occurred in repeat.");                }            } public void func2(DoubleVariable itr, DoubleVariable start,            DoubleVariable limit, DoubleVariable step, CallableVariable f) throws ReturnException {                try {                    for (itr.value = start.value; itr.value <= limit.value; itr.value+=step.value) {                        f.value.call();                    }                } catch (ReturnException e) {                    throw e;                } catch (Exception e) {                    System.out.println("An unidentified error occurred in for.");                }            } public void run() { DoubleVariable temp3 = new DoubleVariable(5.0); Callable<Void> temp4 = () -> { DoubleVariable temp5 = new DoubleVariable(30.0); this.robot.travel(temp5.value); DoubleVariable temp6 = new DoubleVariable(180.0); this.robot.rotate(-temp6.value); DoubleVariable temp7 = new DoubleVariable(30.0); this.robot.travel(temp7.value); DoubleVariable temp8 = new DoubleVariable(45.0); this.robot.rotate(temp8.value); return null; }; CallableVariable temp9 = new CallableVariable(temp4); try { this.func1(temp3, temp9); } catch (ReturnException error) { System.out.println("An unidentified error occurred.");} }public static void main(String[] args) { Logo logo = new Logo(); logo.run();} }